# .github Folder Structure

```
.github/
├── workflows/
│   ├── backend-tests.yml
│   ├── frontend-tests.yml
│   ├── integration-tests.yml
│   ├── lint.yml
│   ├── docker-build.yml
│   └── codeql-analysis.yml
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   ├── feature_request.md
│   ├── documentation_improvement.md
│   └── config.yml
├── PULL_REQUEST_TEMPLATE.md
├── CODEOWNERS
├── dependabot.yml
├── CONTRIBUTING.md
├── SECURITY.md
└── stale.yml
```

## File Contents

### Workflow Files (GitHub Actions)

#### `.github/workflows/backend-tests.yml`
```yaml
name: Backend Tests

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'backend/**'
      - '.github/workflows/backend-tests.yml'
  pull_request:
    branches: [ main, develop ]
    paths:
      - 'backend/**'

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      influxdb:
        image: influxdb:2.0
        env:
          DOCKER_INFLUXDB_INIT_MODE: setup
          DOCKER_INFLUXDB_INIT_USERNAME: influx
          DOCKER_INFLUXDB_INIT_PASSWORD: influxpassword
          DOCKER_INFLUXDB_INIT_ORG: myorg
          DOCKER_INFLUXDB_INIT_BUCKET: mybucket
          DOCKER_INFLUXDB_INIT_ADMIN_TOKEN: mytoken
        ports:
          - 8086:8086
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
          cache: 'pip'
      
      - name: Install dependencies
        working-directory: ./backend
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
      
      - name: Run tests
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
          INFLUXDB_URL: http://localhost:8086
          INFLUXDB_TOKEN: mytoken
          INFLUXDB_ORG: myorg
          INFLUXDB_BUCKET: mybucket
        run: |
          pytest --cov=app tests/
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./backend/coverage.xml
          flags: backend
```

#### `.github/workflows/frontend-tests.yml`
```yaml
name: Frontend Tests

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'frontend/**'
      - '.github/workflows/frontend-tests.yml'
  pull_request:
    branches: [ main, develop ]
    paths:
      - 'frontend/**'

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      
      - name: Run tests
        working-directory: ./frontend
        run: npm test
      
      - name: Build frontend
        working-directory: ./frontend
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: frontend-build
          path: frontend/build/
```

#### `.github/workflows/integration-tests.yml`
```yaml
name: Integration Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  integration-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Start containers with docker-compose
        run: |
          docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d --build
      
      - name: Wait for services to be ready
        run: |
          ./scripts/wait-for-services.sh
      
      - name: Run integration tests
        run: |
          docker-compose -f docker-compose.yml -f docker-compose.test.yml run --rm backend pytest tests/integration/
      
      - name: Collect logs on failure
        if: failure()
        run: |
          docker-compose -f docker-compose.yml -f docker-compose.test.yml logs > docker-logs.txt
      
      - name: Upload logs on failure
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: docker-logs
          path: docker-logs.txt
      
      - name: Stop containers
        if: always()
        run: |
          docker-compose -f docker-compose.yml -f docker-compose.test.yml down -v
```

#### `.github/workflows/lint.yml`
```yaml
name: Lint

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint-backend:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
          cache: 'pip'
      
      - name: Install dependencies
        working-directory: ./backend
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements-dev.txt
      
      - name: Lint with flake8
        working-directory: ./backend
        run: |
          flake8 app tests
      
      - name: Check formatting with black
        working-directory: ./backend
        run: |
          black --check .
      
      - name: Check imports with isort
        working-directory: ./backend
        run: |
          isort --check-only --profile black .
      
      - name: Check types with mypy
        working-directory: ./backend
        run: |
          mypy app/
  
  lint-frontend:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      
      - name: Lint with ESLint
        working-directory: ./frontend
        run: npm run lint
      
      - name: Check formatting with Prettier
        working-directory: ./frontend
        run: npm run format:check
```

#### `.github/workflows/docker-build.yml`
```yaml
name: Build and Push Docker Images

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Extract metadata (tags, labels) for Backend
        id: meta-backend
        uses: docker/metadata-action@v4
        with:
          images: yourusername/your-app-backend
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=ref,event=branch
      
      - name: Build and push Backend image
        uses: docker/build-push-action@v4
        with:
          context: ./backend
          push: true
          tags: ${{ steps.meta-backend.outputs.tags }}
          labels: ${{ steps.meta-backend.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Extract metadata (tags, labels) for Frontend
        id: meta-frontend
        uses: docker/metadata-action@v4
        with:
          images: yourusername/your-app-frontend
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=ref,event=branch
      
      - name: Build and push Frontend image
        uses: docker/build-push-action@v4
        with:
          context: ./frontend
          push: true
          tags: ${{ steps.meta-frontend.outputs.tags }}
          labels: ${{ steps.meta-frontend.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

#### `.github/workflows/codeql-analysis.yml`
```yaml
name: "CodeQL Analysis"

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 12 * * 1'  # Every Monday at 12:00 UTC

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      security-events: write

    strategy:
      fail-fast: false
      matrix:
        language: [ 'python', 'javascript' ]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: ${{ matrix.language }}

      - name: Autobuild
        uses: github/codeql-action/autobuild@v2

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2
```

### Issue Templates

#### `.github/ISSUE_TEMPLATE/bug_report.md`
```markdown
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

## Describe the bug
A clear and concise description of what the bug is.

## To Reproduce
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected behavior
A clear and concise description of what you expected to happen.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
 - OS: [e.g. Windows, macOS, Linux]
 - Browser [e.g. Chrome, Safari, Firefox]
 - Version [e.g. 1.0.0]
 - Docker version [e.g. 20.10.14]
 - Docker Compose version [e.g. 2.4.1]

## Additional context
Add any other context about the problem here.
```

#### `.github/ISSUE_TEMPLATE/feature_request.md`
```markdown
---
name: Feature request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

## Is your feature request related to a problem? Please describe.
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

## Describe the solution you'd like
A clear and concise description of what you want to happen.

## Describe alternatives you've considered
A clear and concise description of any alternative solutions or features you've considered.

## Which component does this feature belong to?
- [ ] Backend
- [ ] Frontend
- [ ] Database
- [ ] Infrastructure
- [ ] Documentation
- [ ] Other (please specify)

## Additional context
Add any other context or screenshots about the feature request here.
```

#### `.github/ISSUE_TEMPLATE/documentation_improvement.md`
```markdown
---
name: Documentation improvement
about: Suggest improvements to our documentation
title: '[DOCS] '
labels: documentation
assignees: ''
---

## Which documentation needs improvement?
Provide links or describe the specific documentation that needs improvement.

## What is the problem with the current documentation?
A clear and concise description of what is wrong or missing in the documentation.

## Suggested improvements
Describe how the documentation could be improved.

## Additional context
Add any other context or screenshots about the documentation improvement here.
```

#### `.github/ISSUE_TEMPLATE/config.yml`
```yaml
blank_issues_enabled: false
contact_links:
  - name: Questions & Discussions
    url: https://github.com/yourusername/your-repo/discussions
    about: Please ask and answer questions here.
  - name: Security Vulnerabilities
    url: https://github.com/yourusername/your-repo/security/policy
    about: Please report security vulnerabilities according to our security policy.
```

### Pull Request Template

#### `.github/PULL_REQUEST_TEMPLATE.md`
```markdown
## Description
Please provide a brief summary of the changes in this pull request.

## Related Issue
Fixes #(issue number)

## Type of change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring (no functional changes)

## How Has This Been Tested?
Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce.

- [ ] Test A
- [ ] Test B

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules
```

### Other Configuration Files

#### `.github/CODEOWNERS`
```
# Default owners for everything in the repo
* @yourusername

# Backend code owners
/backend/ @backend-team-lead

# Frontend code owners
/frontend/ @frontend-team-lead

# Database configuration owners
/databases/ @database-admin

# Infrastructure owners
/infra/ @devops-lead

# Documentation owners
/docs/ @technical-writer

# GitHub workflows
/.github/workflows/ @devops-lead
```

#### `.github/dependabot.yml`
```yaml
version: 2
updates:
  # Backend Python dependencies
  - package-ecosystem: "pip"
    directory: "/backend"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "backend"
    reviewers:
      - "@backend-team-lead"
    groups:
      dev-dependencies:
        patterns:
          - "pytest*"
          - "flake8*"
          - "black"
          - "mypy"
      prod-dependencies:
        patterns:
          - "*"
        exclude-patterns:
          - "pytest*"
          - "flake8*"
          - "black"
          - "mypy"

  # Frontend npm dependencies
  - package-ecosystem: "npm"
    directory: "/frontend"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "frontend"
    reviewers:
      - "@frontend-team-lead"
    groups:
      dev-dependencies:
        patterns:
          - "eslint*"
          - "prettier*"
          - "jest*"
      prod-dependencies:
        patterns:
          - "*"
        exclude-patterns:
          - "eslint*"
          - "prettier*"
          - "jest*"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
    open-pull-requests-limit: 5
    labels:
      - "dependencies"
      - "ci-cd"
    reviewers:
      - "@devops-lead"

  # Docker
  - package-ecosystem: "docker"
    directory: "/backend"
    schedule:
      interval: "monthly"
    labels:
      - "dependencies"
      - "docker"
    reviewers:
      - "@devops-lead"

  - package-ecosystem: "docker"
    directory: "/frontend"
    schedule:
      interval: "monthly"
    labels:
      - "dependencies"
      - "docker"
    reviewers:
      - "@devops-lead"
```

#### `.github/CONTRIBUTING.md`
```markdown
# Contributing to Our Project

First off, thank you for considering contributing to our project! It's people like you that make this project such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/yourusername/your-repo/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/yourusername/your-repo/issues/new?template=bug_report.md). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

- **Ensure the enhancement was not already reported** by searching on GitHub under [Issues](https://github.com/yourusername/your-repo/issues).
- If you're unable to find an open issue addressing the enhancement, [open a new one](https://github.com/yourusername/your-repo/issues/new?template=feature_request.md). Be sure to include a **title and clear description**, as much relevant information as possible, and a **mockup** or **prototype** if applicable.

### Pull Requests

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Setup

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- Docker and Docker Compose
- PostgreSQL 14 or higher (if developing without Docker)
- InfluxDB 2.0 or higher (if developing without Docker)

### Local Development

1. Clone the repository
2. Set up the backend:
   ```
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt -r requirements-dev.txt
   ```
3. Set up the frontend:
   ```
   cd frontend
   npm install
   ```
4. Start the development environment:
   ```
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
   ```

### Testing

- Backend:
  ```
  cd backend
  pytest
  ```
- Frontend:
  ```
  cd frontend
  npm test
  ```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Python Styleguide

- Follow PEP 8
- Use Black for code formatting
- Use isort for import sorting
- Use docstrings for functions and classes

### JavaScript/TypeScript Styleguide

- Use ESLint with our configuration
- Use Prettier for code formatting

## License

By contributing, you agree that your contributions will be licensed under the project's license.
```

#### `.github/SECURITY.md`
```markdown
# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our project seriously. If you believe you've found a security vulnerability, please follow these steps:

1. **Do not disclose the vulnerability publicly**
2. **Email us directly at security@yourcompany.com**
3. Include as much information as possible, including:
   - A description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggestions for addressing the vulnerability (if any)

We will acknowledge receipt of your report within 48 hours and provide an estimated timeline for a fix.

## Security Measures

This project implements several security measures:

- Regular dependency updates with Dependabot
- CodeQL analysis for detecting common vulnerabilities
- Security-focused code reviews
- Regular security assessments

## Best Practices for Users

To ensure the security of your deployment:

- Keep all dependencies up to date
- Use environment variables for sensitive configuration
- Implement proper authentication and authorization
- Follow the principle of least privilege when configuring services
- Regularly backup your databases
- Monitor logs for suspicious activity
```

#### `.github/stale.yml`
```yaml
# Configuration for probot-stale - https://github.com/probot/stale

# Number of days of inactivity before an issue becomes stale
daysUntilStale: 60
# Number of days of inactivity before a stale issue is closed
daysUntilClose: 7
# Issues with these labels will never be considered stale
exemptLabels:
  - pinned
  - security
  - bug
  - enhancement
# Label to use when marking an issue as stale
staleLabel: wontfix
# Comment to post when marking an issue as stale
markComment: >
  This issue has been automatically marked as stale because it has not had
  recent activity. It will be closed if no further activity occurs. Thank you
  for your contributions.
# Comment to post when closing a stale issue
closeComment: >
  This issue has been automatically closed due to inactivity. Please reopen
  if you believe this is still relevant.
# Limit to only 'issues' or 'pulls'
only: issues
```