"use client";
import { DashboardSidebar } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface OrderProduct {
  id: string;
  customerOrderId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    slug: string;
    title: string;
    mainImage: string;
    price: number;
    rating: number;
    description: string;
    manufacturer: string;
    inStock: number;
    categoryId: string;
  };
}

const AdminSingleOrder = () => {
  const [ orderProducts, setOrderProducts ] = useState<OrderProduct[]>();
  const [order, setOrder] = useState<Order>({
    id: "",
    adress: "",
    apartment: "",
    company: "",
    dateTime: "",
    email: "",
    lastname: "",
    name: "",
    phone: "",
    postalCode: "",
    status: "processing",
    total: 0,
  });
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await fetch(
        `http://localhost:3001/api/orders/${params?.id}`
      );
      const data: Order = await response.json();
      setOrder(data);
    };

    const fetchOrderProducts = async () => {
      const response = await fetch(
        `http://localhost:3001/api/order-product/${params?.id}`
      );
      const data: OrderProduct[] = await response.json();
      setOrderProducts(data);
      
    };

    fetchOrderData();
    fetchOrderProducts();
  }, [params?.id]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 w-full max-xl:px-5">
        <h1 className="text-3xl font-semibold">Order details</h1>
        <div className="mt-5">
          <label className="w-full">
            <div>
              <span className="text-xl font-bold">Order ID:</span>
              <span className="text-base"> {order?.id}</span>
            </div>
          </label>
        </div>
        <div className="flex gap-x-2 max-sm:flex-col">
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Name:</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={order?.name}
                onChange={(e) => setOrder({ ...order, name: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Lastname:</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={order?.lastname}
                onChange={(e) =>
                  setOrder({ ...order, lastname: e.target.value })
                }
              />
            </label>
          </div>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Phone number:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={order?.phone}
              onChange={(e) => setOrder({ ...order, phone: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email adress:</span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              value={order?.email}
              onChange={(e) => setOrder({ ...order, email: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Company (optional):</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={order?.company}
              onChange={(e) => setOrder({ ...order, company: e.target.value })}
            />
          </label>
        </div>

        <div className="flex gap-x-2 max-sm:flex-col">
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Address:</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={order?.adress}
                onChange={(e) => setOrder({ ...order, adress: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Apartment, suite, etc. :</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={order?.apartment}
                onChange={(e) =>
                  setOrder({ ...order, apartment: e.target.value })
                }
              />
            </label>
          </div>
        </div>

        <div className="flex gap-x-2 max-sm:flex-col">
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">City:</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Country:</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Postal Code:</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={order?.postalCode}
                onChange={(e) =>
                  setOrder({ ...order, postalCode: e.target.value })
                }
              />
            </label>
          </div>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Order status</span>
            </div>
            <select
              className="select select-bordered"
              value={order?.status}
              onChange={(e) =>
                setOrder({
                  ...order,
                  status: e.target.value as
                    | "processing"
                    | "delivered"
                    | "canceled",
                })
              }
            >
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </label>
        </div>
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Order notice:</span>
            </div>
            <textarea className="textarea textarea-bordered h-24"></textarea>
          </label>
        </div>
        <div>
          { orderProducts?.map(product => (
            <div className="flex items-center gap-x-4" key={product?.id}>
              <Image src={`/${product?.product?.mainImage}`} alt={product?.product?.title} width={50} height={50} className="w-auto h-auto" />
              <div>
              <Link href={`/product/${product?.product?.slug}`}>{product?.product?.title}</Link>
              <p>${ product?.product?.price } * {product?.quantity} items</p>
              </div>

            </div>
          )) }
          <div className="flex flex-col gap-y-2 mt-10">
          <p className="text-2xl">Subtotal: ${ order?.total }</p>
          <p className="text-2xl">Tax 20%: ${ order?.total / 5 }</p>
          <p className="text-2xl">Shipping: $5</p>
          <p className="text-3xl font-semibold">Total: ${ order?.total + (order?.total / 5) + 5 }</p>

          </div>
        </div>
        <div className="flex gap-x-2 max-sm:flex-col">
          <button
            type="button"
            className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
          >
            Update order
          </button>
          <button
            type="button"
            className="uppercase bg-red-600 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2"
          >
            Delete order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleOrder;
