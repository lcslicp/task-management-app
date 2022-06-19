import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const option = {
    type: String,
    required: true,
};

const TaskSchema = new Schema({
    title: option,
    description: {
        type: String,
    },
    status: option,
    priority: option,
    dueDate:{
        type: String,
    },
    createdAt: {
        type: String,
        default: Date.now()
    }
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;