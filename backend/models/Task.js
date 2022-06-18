import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: String,
        default: Date.now()
    }
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;