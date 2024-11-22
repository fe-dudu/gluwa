import { useQuery } from "@tanstack/react-query";
import { getPrice } from "../apis/price";

const usePrice = () => {
    return useQuery({
        queryKey: ["price"],
        queryFn: getPrice,
    });
};

export default usePrice;
