interface Balance {
    CTC: number;
    USDC: number;
    USDT: number;
    WCTC: number;
}

export function getBalance(): Promise<Balance> {
    return fetch("https://inhousedashboard-test-app.azurewebsites.net/api/Interview/get-balance").then((resp) =>
        resp.json()
    );
}
