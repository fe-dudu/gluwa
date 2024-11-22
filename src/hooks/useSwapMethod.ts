import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSwap as apiPostSwap } from "../apis/swap";

const useSwapMethod = () => {
    const queryClient = useQueryClient();

    const postSwap = useMutation({
        mutationFn: apiPostSwap,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["balance"],
            });
        },
    });

    return { postSwap };
};

export default useSwapMethod;
