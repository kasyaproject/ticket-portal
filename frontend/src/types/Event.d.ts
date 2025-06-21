import { DateValue } from "@heroui/react";

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  isFetured?: boolean | string;
  isPublish?: boolean | string;
  isOnline?: boolean | string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  location?: {
    region: string | undefined;
    coordinates: number[];
    address: string | undefined;
  };
  description?: string;
  banner?: string | FileList;
}

interface IEventForm extends IEvent {
  region?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
}

export type { IEvent, IEventForm };
