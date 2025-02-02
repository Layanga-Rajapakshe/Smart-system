import { apiSlice } from "./apiSlice";
import { TASKS_URL } from "../constants";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get this week's tasks
    getThisWeekTasks: builder.query({
      query: ({userId}) => ({
        url: `${TASKS_URL}/thisweek/${userId}`,
        method: 'GET',
      }),
    }),

    // Get next week's tasks
    getNextWeekTasks: builder.query({
      query: ({userId}) => ({
        url: `${TASKS_URL}/nextweek/${userId}`,
        method: 'GET',
      }),
    }),

    // Get previous week's tasks
    getPrevWeekTasks: builder.query({
      query: ({userId}) => ({
        url: `${TASKS_URL}/prevweek/${userId}`,
        method: 'GET',
      }),
    }),

    // Get allocated time for a week
    getAllocatedTime: builder.query({
      query: ({ UserId, StartingDate }) => ({
        url: `${TASKS_URL}/getallocatedtime`,
        method: 'GET',
        body: { UserId, StartingDate }
      }),
    }),

    // Add new task
    createTask: builder.mutation({
      query: (taskData) => ({
        url: `${TASKS_URL}/addnewtask`,
        method: 'POST',
        body: taskData,
      }),
    }),

    // Mark task as finished
    finishTask: builder.mutation({
      query: (taskData) => ({
        url: `${TASKS_URL}/finsishatask`,
        method: 'POST',
        body: taskData,
      }),
    }),

    // Get weekly tasks for a specific date
    getWeeklyTasks: builder.query({
      query: ( UserId, StartingDate ) => ({
        url: `${TASKS_URL}/weeklytasks`,
        method: 'GET',
        body: { UserId, StartingDate }
      }),
    }),

    // Get recurring tasks
    getRecurringTasks: builder.query({
      query: ( {userId, taskType} ) => ({
        url: `${TASKS_URL}/showrecurringtasks/${userId}/${taskType}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetThisWeekTasksQuery,
  useGetNextWeekTasksQuery,
  useGetPrevWeekTasksQuery,
  useGetAllocatedTimeQuery,
  useCreateTaskMutation,
  useFinishTaskMutation,
  useGetWeeklyTasksQuery,
  useGetRecurringTasksQuery,
} = tasksApiSlice;