import mongoose, { ObjectId } from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

export const eventDAO = Yup.object({
  name: Yup.string().required(),
  startDate: Yup.string().required(),
  endDate: Yup.string().required(),
  description: Yup.string().required(),
  banner: Yup.string().required(),
  isFetured: Yup.boolean().required(),
  isOnline: Yup.boolean().required(),
  isPublish: Yup.boolean(),
  category: Yup.string().required(),
  slug: Yup.string(),
  createdBy: Yup.string().required(),
  createdAt: Yup.string(),
  updatedAt: Yup.string(),
  location: Yup.object().required(),
});

export type TEvent = Yup.InferType<typeof eventDAO>;

export interface Event extends Omit<TEvent, "category" | "createdBy"> {
  category: ObjectId;
  createdBy: ObjectId;
}

const EventSchema = new Schema<Event>(
  {
    name: { type: Schema.Types.String, required: true },
    startDate: { type: Schema.Types.String, required: true },
    endDate: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    banner: { type: Schema.Types.String, required: true },
    isFetured: { type: Boolean, required: true },
    isOnline: { type: Boolean, required: true },
    isPublish: { type: Boolean, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // relasi terhadap table Category
    slug: { type: Schema.Types.String, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // relasi terhadap table User
    createdAt: { type: Schema.Types.String },
    updatedAt: { type: Schema.Types.String },
    location: {
      type: {
        region: Schema.Types.Number,
      },
      coordinates: {
        type: [Number],
        required: true,
        default: [0, 0],
      },
    },
  },
  { timestamps: true }
);

// generatae slug sebelum di save ke DB
EventSchema.pre("save", function () {
  if (!this.slug) {
    const slug = this.name.split(" ").join("-").toLocaleLowerCase();

    this.slug = `${slug}`;
  }
});

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel;
