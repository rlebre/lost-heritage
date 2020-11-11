export function dynamicSort(property: string, sortOrder = -1) {
    if (property[0] === '-') {
        property = property.substr(1);
    }

    return (a: any, b: any) => {
        const result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
}