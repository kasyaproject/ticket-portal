interface IEvent {
  name: string;
  slug: string;
  category: string;
  isFetured: boolean | string;
  isPublish: boolean | string;
  isOnline: boolean | string;
  startDate: string;
  endDate: string;
  location?: {
    region: string;
    coordinates: number[];
  };
  description: string;
  banner: string | FileList;
}

interface IEventForm extends IEvent {
  region: string;
  startDate: DateValue;
  endDate: DateValue;
  latitude: string;
  longitude: string;
}

export type { IEvent, IEventForm };
