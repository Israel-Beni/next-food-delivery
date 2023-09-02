import React from "react";
import { useAppContext, CartItem } from "@/contexts/AppContext";
import { centsToDollars } from "@/utils/centsToDollars";
import { isEmpty } from "lodash";

function CartItem({ data }: { data: CartItem }): JSX.Element {
    const { addItem, removeItem } = useAppContext();
    const { quantity = 1, attributes } = data;
    return (
        <div className="p-6 flex flex-wrap justify-between border-b border-blueGray-800">
            <div className="w-2/4">
                <div className="flex flex-col h-full">
                    {attributes && !isEmpty(attributes) && (
                        <h6 className="font-bold ttext-white mb-1">
                            {attributes.name}
                        </h6>
                    )}
                    {attributes &&
                        attributes.price &&
                        typeof attributes.price === "number" && (
                            <span className="block pb-4 mb-auto font-medium text-gray-400">
                                {quantity} x ${centsToDollars(attributes.price)}
                            </span>
                        )}
                </div>
                <div className="w-1/4">
                    <div className="flex flex-col items-end h-full">
                        <div className="flex justify-between">
                            <button
                                className="mr-2 inline-block mb-auto font-medium text-sm text-gray-400 hover:text-gray-200"
                                onClick={() => removeItem(data)}
                            >
                                Remove
                            </button>
                            <button
                                className="inline-block mb-auto font-medium text-gray-400 hover:text-gray-200"
                                onClick={() => addItem(data)}
                            >
                                Add
                            </button>
                        </div>
                        {attributes && attributes.price && (
                            <span className="block mt-2 text-sm font-bold text-white">
                                ${centsToDollars(attributes.price * quantity)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
