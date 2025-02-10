"use client";

import EyeIcon from "@core/components/icons/eye";
import PencilIcon from "@core/components/icons/pencil";
import { ActionIcon, Flex, Tooltip } from "rizzui";
import Link from "next/link";
import cn from "@core/utils/class-names";
import DeletePopover from "../delete-popover";
import ActionIconWithModal from "../EditIconWithModal";

export default function TableRowActionGroup({
  id,
  onDelete,
  baseRoute = "",
  viewComponent,
  viewUrl,
  deletePopoverTitle = "Delete the item",
  deletePopoverDescription = "Are you sure you want to delete this item?",
  className,
}: {
  id?: string | number;
  onDelete?: () => void;
  baseRoute?: string;
  viewComponent: React.ReactNode;
  viewUrl?: string;
  deletePopoverTitle?: string;
  deletePopoverDescription?: string;
  className?: string;
}) {

  const finalViewUrl = viewUrl || (id ? `/${baseRoute}/${baseRoute}-view/${id}` : "#");

  return (
    <Flex
      align="center"
      justify="end"
      gap="3"
      className={cn("pe-3", className)}
    >
      <Tooltip size="sm" content="Edit Item" placement="top" color="invert">

      <ActionIconWithModal
        modalTitle="Edit Item"
        viewComponent={viewComponent}
      />
        {/* <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label="Edit Item"
          onClick={}
        >
          <PencilIcon className="size-4" />
        </ActionIcon> */}

      </Tooltip>
      <Tooltip size="sm" content="View Item" placement="top" color="invert">
        <Link href={finalViewUrl}>
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="View item"
          >
            <EyeIcon className="size-4" />
          </ActionIcon>
        </Link>
      </Tooltip>
      <DeletePopover
        title={deletePopoverTitle}
        description={deletePopoverDescription}
        onDelete={onDelete}
      />
    </Flex>
  );
}
