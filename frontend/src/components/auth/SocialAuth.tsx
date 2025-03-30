import { Button } from '@/components/ui/Button';
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';

export default function SocialAuth() {
  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    // Implement your social auth logic here
  };

  return (
    <div className="flex gap-3">
      <Button
        type="button"
        variant="outline"
        className="flex-1"
        onClick={() => handleSocialLogin('google')}
      >
        <FaGoogle className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        className="flex-1"
        onClick={() => handleSocialLogin('github')}
      >
        <FaGithub className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        className="flex-1"
        onClick={() => handleSocialLogin('twitter')}
      >
        <FaTwitter className="h-4 w-4" />
      </Button>
    </div>
  );
}