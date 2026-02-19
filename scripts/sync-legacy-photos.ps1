param(
  [string]$UploadsPath = "..\wordpress-backup\wp-content\uploads",
  [string]$DestinationPath = ".\public\images\projects"
)

New-Item -ItemType Directory -Force -Path $DestinationPath | Out-Null

$files = @(
  "DSC00338-1.jpg",
  "img_7547.jpg",
  "img_8216.jpg",
  "img_8219.jpg",
  "img_8220.jpg",
  "img_7833.jpg",
  "Patio-3.jpg",
  "Frontier-1.jpg",
  "Frontier-2.jpg",
  "Patio-Construction-site-frontier.jpg",
  "before-after-patio_mp4_hd.original.jpg"
)

foreach ($file in $files) {
  $source = Get-ChildItem -Path $UploadsPath -Recurse -File -Filter $file | Select-Object -First 1
  if ($source) {
    Copy-Item $source.FullName -Destination (Join-Path $DestinationPath $file) -Force
    Write-Host "Copied $file" -ForegroundColor Green
  } else {
    Write-Host "Missing $file" -ForegroundColor Yellow
  }
}
