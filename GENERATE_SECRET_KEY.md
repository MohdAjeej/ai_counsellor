# How to Generate SECRET_KEY

The `SECRET_KEY` is used to sign JWT authentication tokens. It should be a long, random, secret string.

## Quick Methods to Generate

### Option 1: Using Python (Easiest)

```python
import secrets
print(secrets.token_urlsafe(32))
```

Run this in Python:
```powershell
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Option 2: Using OpenSSL (if installed)

```bash
openssl rand -hex 32
```

### Option 3: Using PowerShell

```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

### Option 4: Online Generator
Visit: https://randomkeygen.com/ (use "CodeIgniter Encryption Keys")

## Example SECRET_KEY Values

Here are some example keys (use one or generate your own):

```
SECRET_KEY=my-super-secret-key-12345-change-this-in-production
```

Or a more secure one:
```
SECRET_KEY=8f42a73054b1749f8f58848be5e6502cfe7a16b5a8c9d4e3f2a1b0c9d8e7f6a5b
```

## For Development vs Production

**Development (local testing):**
- Any random string is fine
- Example: `dev-secret-key-12345`

**Production:**
- Must be a strong, random, secret key
- Never commit to version control
- Use environment variables or secret management
- At least 32 characters, mix of letters, numbers, symbols

## Quick Copy-Paste for .env

For quick local development, you can use:
```env
SECRET_KEY=dev-secret-key-for-local-testing-only-change-in-production-12345
```

But for production, generate a proper random key using one of the methods above.

