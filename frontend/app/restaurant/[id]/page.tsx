"use client";
import { useQuery, gql } from "@apollo/client";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { centsToDollars } from "@/utils/centsToDollars";
import Image from "next/image";
import Loader from "@/components/Loader";
import { CartItem, useAppContext } from "@/contexts/AppContext";

import type { TypedDocumentNode } from "@apollo/client";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { RestaurantEntity, DishEntity } from "@/types/__generated__/graphql";

const GET_RESTAURANT_DISHES = gql(`
    query Get_Restaurant_disshes ($id: ID!) {
        restaurant(id: $id) {
            data {
                id
                attributes {
                    name
                    dishes {
                        data {
                            id
                            attributes {
                                name
                                description
                                price
                                image {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);

function DishCard({ data }: { data: DishEntity }): JSX.Element {
    const attributes = data.attributes ? data.attributes : false;
    const imageData =
        data.attributes &&
        data.attributes.image &&
        data.attributes.image &&
        data.attributes.image.data
            ? data.attributes.image.data
            : false;

    const { addItem, setShowCart } = useAppContext();
    const handleAddItem = () => {
        addItem(data as CartItem);
        setShowCart(true);
    };

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="h-full bg-gray-100 rounded-2xl">
                <Image
                    className="w-full rounded-2xl"
                    height={300}
                    width={300}
                    src={`${process.env.STRAPI_URL || "http://127.0.0.1:1337"}${
                        imageData &&
                        imageData.attributes &&
                        imageData.attributes.url
                    }`}
                    alt=""
                />
                <div className="p-8">
                    <div className="group inline-block mb-4">
                        <h3 className="font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
                            {attributes && attributes.name}
                        </h3>
                        <h2>
                            $
                            {attributes &&
                                attributes.price &&
                                centsToDollars(attributes.price)}
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 font-bold">
                        {attributes && attributes.description}
                    </p>
                    <div className="flex flex-wrap md:justify-center -m-2">
                        <div className="w-full md:w-auto p-2 my-6">
                            <button
                                className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 hover:bg-gray-800 focus:ring-gray-500 rounded-full"
                                onClick={handleAddItem}
                            >
                                + Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Restaurant(): JSX.Element | string {
    const params = useParams();
    console.log("params", params);
    const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
        variables: {
            id: params.id,
        },
    });

    if (error) return "Error Loading Dishes";
    if (loading) return <Loader />;
    if (
        data.restaurant &&
        data.restaurant.data &&
        data.restaurant.data.attributes &&
        data.restaurant.data.attributes.dishes &&
        data.restaurant.data.attributes.dishes.data.length
    ) {
        console.log("in part 1");
        const { restaurant } = data;
        const attributes: RestaurantEntity["attributes"] =
            restaurant.data && restaurant.data.attributes
                ? restaurant.data.attributes
                : false;

        return (
            <div className="py-6">
                <h1 className="text-4xl font-bold text-green-600">
                    {attributes && restaurant.data.attributes.name}
                </h1>
                <div className="py-16 px-8 bg-white rounded-3xl">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap -m-4 mb-6">
                            {attributes &&
                                attributes.dishes &&
                                attributes.dishes.data.map((res) => {
                                    return <DishCard key={res.id} data={res} />;
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <h1>No Dishes Found</h1>;
}

export default Restaurant;
