$ErrorActionPreference = "Stop"

$nodeDir = Join-Path $PSScriptRoot ".node"
$nodeExe = Join-Path $nodeDir "node.exe"
$npmCmd = Join-Path $nodeDir "npm.cmd"

if (-not (Test-Path $nodeExe)) {
    Write-Host "Setting up local Node.js environment..."
    $zipPath = Join-Path $env:TEMP "node-v20.zip"
    $tempExtract = Join-Path $env:TEMP "node_extract"
    
    Write-Host "Downloading Node.js v20.18.0..."
    curl.exe -sL "https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip" -o $zipPath
    
    Write-Host "Extracting Node.js..."
    if (Test-Path $tempExtract) { Remove-Item $tempExtract -Recurse -Force }
    Expand-Archive -Path $zipPath -DestinationPath $tempExtract -Force
    
    $extractedFolder = Get-ChildItem -Path (Join-Path $tempExtract "node-v20*") | Select-Object -First 1
    if (Test-Path $nodeDir) { Remove-Item $nodeDir -Recurse -Force }
    Move-Item -Path $extractedFolder.FullName -Destination $nodeDir -Force
    
    Remove-Item $zipPath -Force
    Remove-Item $tempExtract -Recurse -Force
    Write-Host "Node.js successfully configured at: $nodeDir"
}

Write-Host "Node version: "
& $nodeExe -v
Write-Host "NPM version: "
& $npmCmd -v
