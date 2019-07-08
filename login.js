function login(files) {
    const fr = new FileReader()
    fr.onload = function(ev) {
        try {
            const wallet = JSON.parse(ev.target.result);

            arweave.wallets.jwkToAddress(wallet).then((address) => {
                console.log(`Arweave wallet address: ${address}`)


                arweave.wallets.getBalance(wallet).then((balance) => {
                    let winston = balance;
                    let ar = arweave.ar.winstonToAr(balance);

                    console.log(winston);
                    //125213858712

                    console.log(ar);
                    //0.125213858712
                });
            });

        } catch (err) {
            console.log('Error logging in: ', err);
        }

    };

    fr.readAsText(files[0]);
}