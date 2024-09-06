import db from "./db";

export default async function updateStockAfterOrder(orderId) {
    try {
        // Find the order by orderId, selecting the necessary meta fields
        const order = await db.orders.findUnique({
            where: {
                orderId: orderId
            },
            select: {
                varientMeta: true,
                comboMeta: true
            }
        });

        // Ensure the order exists and contains varientMeta and comboMeta data
        if (!order || (!order.varientMeta && !order.comboMeta)) {
            return {
                success: false,
                message: "Order or metadata not found"
            };
        }

        // Update quantity for each variant
        if (order.varientMeta && order.varientMeta.length > 0) {
            for (let index = 0; index < order.varientMeta.length; index++) {
                await db.varient.update({
                    where: {
                        id: order.varientMeta[index].varient.id
                    },
                    data: {
                        qty: {
                            decrement: order.varientMeta[index].qty
                        }
                    }
                });
            }
        }

        // Update quantity for each combo
        if (order.comboMeta && order.comboMeta.length > 0) {
            for (let index = 0; index < order.comboMeta.length; index++) {
                await db.combo.update({
                    where: {
                        id: order.comboMeta[index].combo.id
                    },
                    data: {
                        qty: {
                            decrement: order.comboMeta[index].qty
                        }
                    }
                });
            }
        }

        return {
            success: true,
            message: "Stock updated successfully"
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error.meta?.cause || "Internal server error"
        };
    }
}
