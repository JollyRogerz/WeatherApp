function login(files) {
    const fr = new FileReader()
    fr.onload = function (ev) {
        try {
             wallet = JSON.parse(ev.target.result);

            arweave.wallets.jwkToAddress(wallet).then((address) => {
                console.log(`Arweave wallet address: ${address}`)

                
                document.getElementById("login").textContent = "Logged In";
                


                arweave.wallets.getBalance(address).then((balance) => {
                    let winston = balance;
                    let ar = arweave.ar.winstonToAr(balance);

                    console.log(winston);

                    console.log(ar);

                    document.getElementById("dropzone").innerHTML = address + "<br><b>Balance:</b> " + ar + " <b>AR Tokens</b>";
                });
            });

        } catch (err) {
            console.log('Error logging in: ', err);
        }
        

    };

    fr.readAsText(files[0]);
}