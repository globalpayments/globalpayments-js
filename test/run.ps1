function Npm {
  if (Get-Command "yarn" -ErrorAction SilentlyContinue) {
    return "yarn"
  } else {
    return "npm"
  }
}

$Process = Start-Process -FilePath Npm -ArgumentList "run start" -PassThru
$ServerPid = $Process.Id

Start-Process -FilePath Npm -ArgumentList "run test" -PassThru -Wait

Stop-Process -Id $ServerPid -ErrorAction stop
