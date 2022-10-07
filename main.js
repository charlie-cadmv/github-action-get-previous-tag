const { exec } = require('child_process');
exec('git describe --match "v[0-9]*.[0-9]*.[0-9]*" --abbrev=0', (tag, rev, err) => {
    if (err) {
        console.log('\x1b[33m%s\x1b[0m', 'Could not find any matching tags');
        process.exit(1);
    }

    tag = tag.trim()
    exec(`git log -1 --format=%at ${tag}`, (err, timestamp, stderr) => {
        if (err) {
            console.log('\x1b[33m%s\x1b[0m', 'Could not find any timestamp because: ');
            console.log('\x1b[31m%s\x1b[0m', stderr);
            process.exit(1);
        }

        timestamp = timestamp.trim()

        console.log('\x1b[32m%s\x1b[0m', `Found tag: ${tag}`);
        console.log('\x1b[32m%s\x1b[0m', `Found timestamp: ${timestamp}`);
        console.log(`::set-output name=tag::${tag}`);
        console.log(`::set-output name=timestamp::${timestamp}`);
        process.exit(0);
    });
});
