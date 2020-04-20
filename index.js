const fs = require('fs');
const json = fs.readFile(process.stdin.fd, 'utf-8', function(_err, json) {
  const data = JSON.parse(json);
  const out = [];
  function echo(s) {
    out.push(s);
  }

  echo('---');
  echo('version: "2.4"');
  echo('services:');
  data.forEach(c => {
    echo(`  ${c.Name.replace(/[^a-zA-Z0-9]/g, '')}:`);
    echo(`    image: ${c.Config.Image}`);
    echo(`    entrypoint: ${JSON.stringify(c.Config.Entrypoint)}`);
    echo(`    command: ${JSON.stringify(c.Config.Cmd)}`);
    echo(`    environment:`);
    c.Config.Env.forEach(e => {
      echo(`     - "${e}"`);
    });
    const ports = getPorts(c);
    if (ports.length > 0) {
      echo(`    ports:`);
      ports.forEach(function (port) {
        echo(`     - ${port}`);
      });
    }
  });

  console.log(out.join('\n'));
});

function getPorts(c) {
  const ret = [];
  if (c.NetworkSettings && c.NetworkSettings.Ports) {
    for (const port in c.NetworkSettings.Ports) {
      const hostPorts = c.NetworkSettings.Ports[port];
      if (hostPorts) {
        hostPorts.forEach(p => {
          ret.push(`${p.HostIp}:${p.HostPort}:${port}`);
        });
      }
    }
  }
  return ret;
}
