import { DELAY } from "@/constants/list.const";
import useDebounce from "@/hooks/useDebounce";
import eventServices from "@/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateLocation = yup.object().shape({
  isOnline: yup.string().required("Please select event status"),
  region: yup.string().required("Please select event region"),
  address: yup.string().required("Please input event address"),
  longitude: yup.string().required("Please input longitude coordinate"),
  latitude: yup.string().required("Please input latitude coordinate"),
});

const useLocationTab = () => {
  const debounce = useDebounce();
  const [searchRegion, setSearchRegion] = useState("");

  // Ambil data region event dari API untuk modal ADD
  const { data: dataRegion } = useQuery({
    queryKey: ["Regions", searchRegion],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegion}`),
    enabled: searchRegion !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegion(region), DELAY);
  };

  // Resolver untuk Update Info Event Location
  const {
    control: controlUpdateLocation,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: errorsUpdateLocation },
    reset: resetUpdateLocation,
    setValue: setValueUpdateLocation,
  } = useForm({
    resolver: yupResolver(schemaUpdateLocation),
  });

  return {
    controlUpdateLocation,
    errorsUpdateLocation,
    handleSubmitUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,

    dataRegion,
    searchRegion,
    handleSearchRegion,
  };
};
export default useLocationTab;
