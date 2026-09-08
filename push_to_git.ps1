$git = "C:\Users\user\.gemini\antigravity\scratch\mingit\cmd\git.exe"
$repo = "https://github.com/srisairavula4-create/sih-hackthon.git"

Write-Host "Initializing git repository..."
& $git init -b main
& $git config user.name "srisairavula4-create"
& $git config user.email "user@users.noreply.github.com"

Write-Host "Adding files..."
& $git add .

Write-Host "Checking status..."
& $git status -s

Write-Host "Committing changes..."
& $git commit -m "feat: Complete AI-Powered Ayurvedic Patient Case-Taking and Medical History System (SIH Prototype)"

Write-Host "Setting remote origin..."
& $git remote remove origin 2>$null
& $git remote add origin $repo

Write-Host "Attempting push to $repo..."
& $git push -u origin main
