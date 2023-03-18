import { createRouter, createWebHistory } from "vue-router";
import TheCore from "@/modules/core/TheCore.vue";
import TheTask from "@/modules/task/TheTask.vue";
import TheTeam from "@/modules/team/TheTeam.vue";
import TheBank from "@/modules/bank/TheBank.vue";
import TheHome from "@/modules/core/components/TheHome.vue";
import TaskList from "@/modules/task/components/TaskList.vue";
import TaskDetails from "@/modules/task/components/TaskDetails.vue";
import TaskEdit from "@/modules/task/components/TaskEdit.vue";
import BankList from "@/modules/bank/components/BankList.vue";
import BankDetails from "@/modules/bank/components/BankDetails.vue";
import BankEdit from "@/modules/bank/components/BankEdit.vue";
import TeamList from "@/modules/team/components/TeamList.vue";
import TeamDetails from "@/modules/team/components/TeamDetails.vue";
import TeamEdit from "@/modules/team/components/TeamEdit.vue";
import TeamCreate from "@/modules/team/components/TeamCreate.vue";
import i18n from "@/plugins/i18n";
import { setLocale } from "@vee-validate/i18n";

const LANGUAGE_CODE_LENGTH = 2;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // core
    {
      path: "",
      redirect: () => {
        const locale =
          navigator.language?.length > LANGUAGE_CODE_LENGTH
            ? navigator.language.slice(0, LANGUAGE_CODE_LENGTH)
            : navigator.language;

        return {
          path: locale,
        };
      },
    },
    {
      path: "/:locale",
      name: "TheCore",
      component: TheCore,
      children: [
        // home
        {
          path: "",
          name: "TheHome",
          component: TheHome,
        },
        // task
        {
          path: "tasks",
          name: "TheTask",
          component: TheTask,
          children: [
            {
              path: "",
              name: "TaskWrapper",
              redirect: {
                name: "TaskList",
              },
            },
            {
              path: "list/:pageNumber(-?\\d*\\.{0,1}\\d+)?",
              name: "TaskList",
              component: TaskList,
              props: true,
            },
            {
              path: "details/:uuid",
              name: "TaskDetails",
              component: TaskDetails,
              props: true,
            },
            {
              path: "edit/:uuid",
              name: "TaskEdit",
              component: TaskEdit,
              props: true,
            },
          ],
        },
        // bank
        {
          path: "banks",
          name: "TheBank",
          component: TheBank,
          children: [
            {
              path: "",
              name: "BankWrapper",
              redirect: {
                name: "BankList",
              },
            },
            {
              path: "list/:pageNumber(-?\\d*\\.{0,1}\\d+)?",
              name: "BankList",
              component: BankList,
              props: true,
            },
            {
              path: "details/:uuid",
              name: "BankDetails",
              component: BankDetails,
              props: true,
            },
            {
              path: "edit/:uuid",
              name: "BankEdit",
              component: BankEdit,
              props: true,
            },
          ],
        },
        // team
        {
          path: "teams",
          name: "TheTeam",
          component: TheTeam,
          children: [
            {
              path: "",
              name: "TeamWrapper",
              redirect: {
                name: "TeamList",
              },
            },
            {
              path: "list",
              name: "TeamList",
              component: TeamList,
            },
            {
              path: "details/:thumbnailUrl/:uuid",
              name: "TeamDetails",
              component: TeamDetails,
              props: true,
            },
            {
              path: "edit/:thumbnailUrl/:uuid",
              name: "TeamEdit",
              component: TeamEdit,
              props: true,
            },
            {
              path: "create",
              name: "TeamCreate",
              component: TeamCreate,
            },
          ],
        },
      ],
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/",
    },
  ],
});

router.beforeEach((to) => {
  const locale = to.params.locale as string;

  if (i18n.global.availableLocales.includes(locale)) {
    i18n.global.locale.value = locale;
    setLocale(locale);
    return true;
  }

  i18n.global.locale.value = i18n.global.fallbackLocale.value as string;
  setLocale(i18n.global.fallbackLocale.value as string);
  return {
    ...to,
    params: {
      ...to.params,
      locale: i18n.global.locale.value,
    },
  };
});

export default router;
