function save_weather() {
    (async () => {

        var weatherTimeUnix = Math.round((new Date()).getTime() / 1000)

        var tx =
            await arweave.createTransaction(
                {
                    target: address,
                    data: arweave.utils.concatBuffers([content]),
                    quantity: tokens
                },
                wallet
            )

        tx.addTag('App-Name', 'WeatherApp')
        tx.addTag('App-Version', '0.0.1')
        tx.addTag('Unix-Time', weatherTimeUnix)
        await arweave.transactions.sign(tx, wallet)
        console.log(tx.id)
        await arweave.transactions.post(tx)
        alert('Weather Saved')

    })()
}

