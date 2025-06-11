import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import useMediaHandling from "@/hooks/useMediaHandling";
import { DateValue } from "@heroui/react";
import categoryServices from "@/services/category.service";
import { useRouter } from "next/router";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { DELAY } from "@/constants/list.const";
import { toDateStandard } from "@/utils/date";
import { getLocalTimeZone, now } from "@internationalized/date";

const schema = yup.object().shape({
  name: yup.string().required("Please input event name"),
  slug: yup.string().required("Please input event slug"),
  category: yup.string().required("Please select event category"),
  startDate: yup.mixed<DateValue>().required("Please select event start date"),
  endDate: yup.mixed<DateValue>().required("Please select event end date"),
  isPublish: yup.string().required("Please select event status"),
  isFetured: yup.string().required("Please select event featured"),
  description: yup.string().required("Please input event description"),
  isOnline: yup.string().required("Please select event online status"),
  region: yup.string().required("Please select event region"),
  longitude: yup.string().required("Please input longitude coordinate"),
  latitude: yup.string().required("Please input latitude coordinate"),
  banner: yup.mixed<FileList | string>().required("Please input event banner"),
  address: yup.string().required("Please input event address"),
});

const useAddEventModal = () => {
  const {
    isPendingUploadFile,
    isPendingDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: now(getLocalTimeZone()),
      endDate: now(getLocalTimeZone()),
    },
  });

  const debounce = useDebounce();
  const router = useRouter();
  const preview = watch("banner");
  const fileUrl = getValues("banner");
  const [searchRegion, setSearchRegion] = useState("");

  // Untuk upload image agar bisa di preview
  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  // Untuk delete image
  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  // Membersihkan form modal saat di close
  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  // Ambil data category event dari API untuk modal ADD
  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  // Ambil data region event dari API untuk modal ADD
  const { data: dataRegion } = useQuery({
    queryKey: ["Regions", searchRegion],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegion}`),
    enabled: searchRegion !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegion(region), DELAY);
  };

  // Digunakan untuk menambahkan detail kategori baru
  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload);

    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingAddEvent,
    isSuccess: isSuccessAddEvent,
  } = useMutation({
    mutationKey: ["addEvent"],
    mutationFn: addEvent,
    onError: (error) => {
      addToast({
        title: "Add Event Failed",
        description: error.message + " 😢",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Add Event Success",
        description: "Success to add new Event 😊",
        variant: "bordered",
        color: "success",
      });
      reset();
    },
  });

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      // isFetured: Boolean(data.isFetured),
      // isPublish: Boolean(data.isPublish),
      // isOnline: Boolean(data.isOnline),
      // isOnline: data.isOnline === "true" ? true : false,
      // isFetured: data.isFetured === "true" ? true : false,
      // isPublish: data.isPublish === "true" ? true : false,
      startDate: toDateStandard(data.startDate),
      endDate: toDateStandard(data.endDate),
      location: {
        region: data.region,
        coordinates: [Number(data.latitude), Number(data.longitude)],
        address: data.address,
      },
      banner: data.banner,
    };

    mutateAddEvent(payload);
  };

  return {
    control,
    errors,
    reset,
    handleAddEvent,
    handleOnClose,
    handleSubmitForm,
    isPendingAddEvent,
    isSuccessAddEvent,

    handleUploadBanner,
    isPendingUploadFile,
    handleDeleteBanner,
    isPendingDeleteFile,
    preview,

    dataCategory,
    dataRegion,
    searchRegion,
    handleSearchRegion,
  };
};

export default useAddEventModal;
