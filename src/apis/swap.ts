import { Token } from "../types/token";

export interface PostSwapPayload {
    payAmount: string;
    payToken: Token;
    receiveAmount: string;
    receiveToken: Token;
}

export async function postSwap(payload: PostSwapPayload): Promise<void> {
    await fetch("https://inhousedashboard-test-app.azurewebsites.net/api/Interview/post-swap", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
}
