interface Price {
    CTC: number;
    USDC: number;
    USDT: number;
    WCTC: number;
}

export function getPrice(): Promise<Price> {
    return fetch("https://inhousedashboard-test-app.azurewebsites.net/api/Interview/get-price").then((resp) =>
        resp.json()
    );
}
