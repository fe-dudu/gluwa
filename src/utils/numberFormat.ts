export function maxNumberFormat(val?: number | null) {
    const nf = new Intl.NumberFormat("en", { maximumFractionDigits: 30 });
    if (val === null || val === undefined) {
        return val;
    }
    return nf.format(val);
}
