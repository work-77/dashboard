"use client";

import EyeIcon from "@core/components/icons/eye";
import PencilIcon from "@core/components/icons/pencil";
import { ActionIcon, Flex, Tooltip } from "rizzui";
import Link from "next/link";
import cn from "@core/utils/class-names";
import DeletePopover from "../delete-popover";

export default function TableRowActionGroup({
  id,
  onDelete,
  baseRoute = "",
  editUrl,
  viewUrl,
  deletePopoverTitle = "Delete the item",
  deletePopoverDescription = "Are you sure you want to delete this item?",
  className,
}: {
  id?: string | number; // Make id optional, but log a warning if missing
  onDelete?: () => void;
  baseRoute?: string; 
  editUrl?: string;
  viewUrl?: string;
  deletePopoverTitle?: string;
  deletePopoverDescription?: string;
  className?: string;
}) {

  // Provide fallback for editUrl and viewUrl if id is undefined
  const finalEditUrl = editUrl || (id ? `/${baseRoute}/${baseRoute}-edit/${id}` : "#");
  const finalViewUrl = viewUrl || (id ? `/${baseRoute}/${baseRoute}-view/${id}` : "#");

  return (
    <Flex
      align="center"
      justify="end"
      gap="3"
      className={cn("pe-3", className)}
    >
      <Tooltip size="sm" content="Edit Item" placement="top" color="invert">
    
        <Link href={finalEditUrl}>
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="Edit Item"
          >
            <PencilIcon className="size-4" />
          </ActionIcon>
        </Link>
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
