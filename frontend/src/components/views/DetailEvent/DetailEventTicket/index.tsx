import { ICart, ITicket } from "@/types/Ticket";
import { convertToIDR } from "@/utils/currency";
import { Accordion, AccordionItem, Button, Card, Chip } from "@heroui/react";
import { useSession } from "next-auth/react";
import React from "react";

interface PropTypes {
  key: string;
  dataTicket: ITicket;
  cart: ICart;
  handleAddToCart: () => void;
}

const DetailEventTicket = (props: PropTypes) => {
  const { key, dataTicket, cart, handleAddToCart } = props;
  const session = useSession();

  return (
    <Card className="px-4 pb-4" key={key}>
      <Accordion>
        <AccordionItem
          key={dataTicket?._id}
          aria-label={dataTicket?.name}
          className="border-b-2 border-dashed"
          title={
            <div className="flex items-center gap-2 pb-0">
              <h2 className="text-xl font-bold from-foreground-700">
                {dataTicket?.name}
              </h2>
              {Number(dataTicket.quantity) > 0 ? (
                <Chip size="sm" color="success" variant="bordered">
                  Available
                </Chip>
              ) : (
                <Chip size="sm" color="danger" variant="bordered">
                  Sold Out
                </Chip>
              )}
            </div>
          }
        >
          <p>{dataTicket?.description}</p>
        </AccordionItem>
      </Accordion>

      <div className="flex items-center justify-between p-2 mt-2">
        <h2 className="text-lg font-semibold text-foreground-700">
          {convertToIDR(Number(dataTicket?.price))}
        </h2>

        {session.status === "authenticated" &&
          Number(dataTicket?.quantity) > 0 && (
            <Button
              size="md"
              color="primary"
              variant="bordered"
              className="font-bold text-primary disabled:opacity-20"
              isDisabled={cart?.ticket === dataTicket._id}
              onPress={handleAddToCart}
            >
              Add To Cart
            </Button>
          )}
      </div>
    </Card>
  );
};

export default DetailEventTicket;
