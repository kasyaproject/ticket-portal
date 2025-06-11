import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAddEventModal from "./useAddEventModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { IRegency } from "@/types/Category.d copy";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvent: () => void;
}

const AddEventModal = (props: PropsTypes) => {
  const { isOpen, onClose, onOpenChange, refetchEvent } = props;
  const {
    control,
    errors,
    handleAddEvent,
    handleOnClose,
    handleSubmitForm,
    isPendingAddEvent,
    isSuccessAddEvent,

    preview,
    handleUploadBanner,
    isPendingUploadFile,
    handleDeleteBanner,
    isPendingDeleteFile,

    dataCategory,
    dataRegion,
    searchRegion,
    handleSearchRegion,
  } = useAddEventModal();
  const disableSubmit =
    isPendingAddEvent || isPendingUploadFile || isPendingDeleteFile;

  useEffect(() => {
    if (isSuccessAddEvent) {
      onClose();
      refetchEvent();
    }
  }, [isSuccessAddEvent]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      size="2xl"
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddEvent)}>
        <ModalContent className="m-4">
          <ModalHeader className="font-bold">Add Event</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              {/* Form */}
              <p className="text-sm font-semibold">Detail Event</p>
              <div className="flex flex-col gap-2">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Event Name"
                      variant="bordered"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Event Slug"
                      variant="bordered"
                      isInvalid={errors.slug !== undefined}
                      errorMessage={errors.slug?.message}
                    />
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataCategory?.data.data || []}
                      className="w-full"
                      label="Event Category"
                      variant="bordered"
                      onSelectionChange={(value) => onChange(value)}
                      isInvalid={errors.category !== undefined}
                      errorMessage={errors.category?.message}
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={`${category._id}`}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="Event Start Date"
                        variant="bordered"
                        showMonthAndYearPickers
                        hideTimeZone
                        isInvalid={errors.startDate !== undefined}
                        errorMessage={errors.startDate?.message}
                      />
                    )}
                  />
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="Event End Date"
                        variant="bordered"
                        showMonthAndYearPickers
                        hideTimeZone
                        isInvalid={errors.endDate !== undefined}
                        errorMessage={errors.endDate?.message}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="description"
                      variant="bordered"
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                    />
                  )}
                />
                <Controller
                  name="isPublish"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status Event"
                      variant="bordered"
                      isInvalid={errors.isPublish !== undefined}
                      errorMessage={errors.isPublish?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Publish
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Not Publish
                      </SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name="isFetured"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Featured Event"
                      variant="bordered"
                      isInvalid={errors.isFetured !== undefined}
                      errorMessage={errors.isFetured?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Yes
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        No
                      </SelectItem>
                    </Select>
                  )}
                />
              </div>

              <hr className="my-2" />

              <p className="text-sm font-semibold">Location Event</p>
              <div className="flex flex-col gap-2">
                <Controller
                  name="isOnline"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Online / Offline Event"
                      variant="bordered"
                      isInvalid={errors.isOnline !== undefined}
                      errorMessage={errors.isOnline?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Yes
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        No
                      </SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name="region"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={
                        dataRegion?.data.data && searchRegion !== ""
                          ? dataRegion?.data.data
                          : []
                      }
                      className="w-full"
                      label="Search Event Region"
                      variant="bordered"
                      onInputChange={(search) => handleSearchRegion(search)}
                      onSelectionChange={(value) => onChange(value)}
                      isInvalid={errors.region !== undefined}
                      errorMessage={errors.region?.message}
                    >
                      {(regions: IRegency) => (
                        <AutocompleteItem key={`${regions.id}`}>
                          {regions.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />

                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="address"
                      variant="bordered"
                      isInvalid={errors.address !== undefined}
                      errorMessage={errors.address?.message}
                    />
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Controller
                    name="latitude"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Latitude"
                        variant="bordered"
                        isInvalid={errors.latitude !== undefined}
                        errorMessage={errors.latitude?.message}
                      />
                    )}
                  />

                  <Controller
                    name="longitude"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Longitude"
                        variant="bordered"
                        isInvalid={errors.longitude !== undefined}
                        errorMessage={errors.longitude?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <hr className="my-2" />

              <p className="-mb-1 text-sm font-semibold">Cover Banner Event</p>
              <div>
                <Controller
                  name="banner"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <InputFile
                      {...field}
                      onDelete={() => handleDeleteBanner(onChange)}
                      onUpload={(files) => handleUploadBanner(files, onChange)}
                      isUploading={isPendingUploadFile}
                      isDeleting={isPendingDeleteFile}
                      isInvalid={errors.banner !== undefined}
                      errorMessage={errors.banner?.message}
                      isDropable
                      preview={typeof preview === "string" ? preview : ""}
                    />
                  )}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              className="font-semibold text-primary"
              onPress={() => handleOnClose(onClose)}
              disabled={disableSubmit}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              type="submit"
              className="font-semibold"
              disabled={disableSubmit}
              // onPress={onClose}
            >
              {isPendingAddEvent ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Event"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddEventModal;
