import { ICart, ITicket } from "@/types/Ticket";
import { convertToIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Spinner,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface PropTypes {
  cart: ICart;
  dataTicketInCart: ITicket;
  onChangeQuantity: (type: "increment" | "decrement") => void;
  onCreateOrder: () => void;
  isLoading: boolean;
}

const DetailEventCart = (props: PropTypes) => {
  const { cart, dataTicketInCart, onChangeQuantity, onCreateOrder, isLoading } =
    props;
  const session = useSession();
  const router = useRouter();

  return (
    <Card radius="lg" className="lg:sticky lg:top-[40px] border-none p-6">
      {session.status === "authenticated" ? (
        <CardBody className="gap-4">
          <h2 className="text-xl font-semibold text-foreground-700">Cart</h2>

          {cart.ticket === "" ? (
            //    Jika Cart Kosong
            <div>
              <p className="text-foreground-500">Your Cart is Empty</p>

              <Divider className="my-4" />

              <div className="flex items-center mt-2">
                <Button color="primary" size="md" isDisabled>
                  CheckOut
                </Button>

                <p className="w-full text-xl font-bold text-end">0</p>
              </div>
            </div>
          ) : (
            //   Jika Cart ada ticket
            <div className="flex flex-col justify-between">
              <div className="flex items-center justify-between w-full">
                <h4>{dataTicketInCart.name}</h4>
                <div className="flex items-center gap-2">
                  <Button
                    size="md"
                    variant="bordered"
                    className="min-w-0 font-bold rounded-full h-9 w-9 scale-80 text-foreground-500"
                    onPress={() => onChangeQuantity("decrement")}
                  >
                    -
                  </Button>
                  <span className="text-lg font-bold">{cart.quantity}</span>
                  <Button
                    size="md"
                    variant="bordered"
                    className="min-w-0 font-bold rounded-full h-9 w-9 scale-80 text-foreground-500"
                    onPress={() => onChangeQuantity("increment")}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Divider className="my-4" />

              <div className="flex items-center mt-2">
                <Button
                  color="primary"
                  size="md"
                  disabled={cart.quantity === 0 || isLoading}
                  className="disabled:bg-primary-400"
                  onPress={onCreateOrder}
                >
                  {isLoading ? <Spinner color="white" size="sm" /> : "CheckOut"}
                </Button>

                <p className="w-full text-xl font-bold text-end">
                  {convertToIDR(Number(dataTicketInCart.price) * cart.quantity)}
                </p>
              </div>
            </div>
          )}
        </CardBody>
      ) : (
        <CardBody>
          <Button
            color="primary"
            size="lg"
            as={Link}
            href={`/auth/login?callbackUrl=/event/${router.query.slug}`}
          >
            Login for book ticket
          </Button>
        </CardBody>
      )}
    </Card>
  );
};

export default DetailEventCart;
