# Helper functions

import uuid
from datetime import datetime, date
from typing import Any, Dict, List, Optional, Union


def generate_id(prefix: str = "") -> str:
    """
    Generate a unique ID with an optional prefix
    """
    uid = str(uuid.uuid4())[:8]
    return f"{prefix}{uid}" if prefix else uid


def parse_date(date_str: Optional[str]) -> Optional[date]:
    """
    Parse a date string in ISO format
    """
    if not date_str:
        return None
    
    try:
        return datetime.fromisoformat(date_str).date()
    except ValueError:
        return None


def format_response(
    data: Any,
    message: Optional[str] = None,
    status: str = "success",
    meta: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Format a consistent API response
    """
    response = {
        "status": status,
        "data": data
    }
    
    if message:
        response["message"] = message
    
    if meta:
        response["meta"] = meta
    
    return response