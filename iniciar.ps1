$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$runtimePath = Join-Path $PSScriptRoot '.runtime/node-v22.23.3-win-x64'
if (Test-Path -LiteralPath $runtimePath) { $env:Path = $runtimePath + ';' + $env:Path }
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Instale Node.js 22 LTS para executar o site.' }
if (-not (Test-Path -LiteralPath 'node_modules')) { & npm.cmd install; if ($LASTEXITCODE -ne 0) { throw 'Falha ao instalar dependências.' } }
& npm.cmd run dev
