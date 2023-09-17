import { InferSchemaType, Schema, model } from 'mongoose';

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
},
{
    timestamps: true // Automatically add createdAt and updatedAt fields
});

type Note = InferSchemaType<typeof NoteSchema>;
export default model <Note>('Note', NoteSchema); // it will create a collection named Note

