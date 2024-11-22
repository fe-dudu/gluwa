import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../apis/balance";

const useBalance = () => {
    return useQuery({
        queryKey: ["balance"],
        queryFn: getBalance,
    });
};

export default useBalance;
