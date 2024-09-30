import db from "./db"

export default async function checkStockFes(order) {
    try {
        const shortVarients = [];
        const shortCombo = [];

        // Process varientMeta
        if (order.varientMeta) {
            await Promise.all(order.varientMeta.map(async (obj) => {
                const reqQty = obj.qty;
                const varientState = await db.varient.findUnique({
                    where: {
                        id: obj.varient.id,
                    },
                    select: {
                        qty: true,
                    },
                });

                if (varientState && reqQty > varientState.qty) {
                    shortVarients.push({ id: obj.varient.id, shortQty: reqQty - varientState.qty });
                }
            }));
        }

        // Process comboMeta
        if (order.comboMeta) {
            await Promise.all(order.comboMeta.map(async (obj) => {
                const reqQty = obj.qty;
                const comboState = await db.combo.findUnique({
                    where: {
                        id: obj.combo.id,
                    },
                    select: {
                        qty: true,
                    },
                });

                if (comboState && reqQty > comboState.qty) {
                    shortCombo.push({ id: obj.combo.id, shortQty: (reqQty - comboState.qty) });
                }
            }));
        }

        return {
            shortCombo,
            shortVarients,
        };

    } catch (error) {
        console.log(error);
        return {};
    }
}
