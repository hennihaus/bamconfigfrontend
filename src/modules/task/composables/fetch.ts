import type { Ref } from "vue";
import {
  computed,
  inject,
  onBeforeMount,
  onUnmounted,
  readonly,
  ref,
  watchEffect,
} from "vue";
import { TASK_API } from "@/plugins/http";
import type { TaskApiService } from "@/services/task-api-service";
import type { Task } from "@hennihaus/bamconfigbackend";
import { useBaseI18n } from "@/modules/base/composables/i18n";

export const useTasksFetch = (afterTaskFetch: () => void = () => {}) => {
  const taskApi = inject(TASK_API) as TaskApiService;

  const tasks = ref<Task[]>([]);
  const isLoading = ref(true);

  onBeforeMount(() =>
    taskApi
      .getAll()
      .then((result) => (tasks.value = result))
      .catch(() => (tasks.value = []))
      .finally(() => (isLoading.value = false))
      .then(() => afterTaskFetch())
  );

  const asyncTask = computed(() => {
    return tasks.value.find((task) =>
      task.banks.some((bank) => bank.isAsync)
    ) as Task;
  });

  const activatedTasks = computed(() => {
    return tasks.value.filter((task) => {
      if (!task.banks.some((bank) => bank.isAsync)) {
        return true;
      }
      return task.banks.some((bank) => bank.isActive);
    });
  });

  return {
    tasks: readonly(tasks),
    isLoading: readonly(isLoading),
    activatedTasks,
    asyncTask,
  };
};

export const useTaskFetch = (uuid: Ref<string>) => {
  const { t } = useBaseI18n();
  const taskApi = inject(TASK_API) as TaskApiService;

  const task = ref<Task>();
  const isLoading = ref(false);
  const error = ref("");

  const unwatch = watchEffect(async () => {
    try {
      isLoading.value = true;
      task.value = await taskApi.getOne(uuid.value);
      error.value = "";
    } catch (e) {
      error.value = t("task.not-found", 1);
    } finally {
      isLoading.value = false;
    }
  });
  onUnmounted(() => unwatch());

  const updateTask = async (update: Task): Promise<Task | null> => {
    try {
      isLoading.value = true;
      task.value = await taskApi.update(update);
      error.value = "";
      return task.value;
    } catch (e) {
      error.value = t("task.edit-error");
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    task,
    isLoading: readonly(isLoading),
    error: readonly(error),
    updateTask,
  };
};
