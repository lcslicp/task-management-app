import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const optionRequired = {
    type: String,
    required: true,
};

const TaskSchema = new Schema({
    title: optionRequired,
    description: {
        type: String,
    },
    status: optionRequired,
    priority: optionRequired,
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