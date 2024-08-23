export const customMutation = (mutationFn, payload, onSuccess, onError) => {
  mutationFn.mutate(payload, {
    onSuccess: onSuccess,
    onError: onError,
  });
};
