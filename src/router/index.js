import { createRouter, createWebHistory } from "vue-router";
import TheCore from "@/modules/core/TheCore.vue";
import TheHome from "@/modules/core/components/TheHome.vue";
import TaskList from "@/modules/task/components/TaskList.vue";
import BankList from "@/modules/bank/components/BankList.vue";
import TeamList from "@/modules/team/components/TeamList.vue";
import TeamCreate from "@/modules/team/components/TeamCreate.vue";
import TheTask from "@/modules/task/TheTask.vue";
import TheTeam from "@/modules/team/TheTeam.vue";
import TheBank from "@/modules/bank/TheBank.vue";
import TeamDetails from "@/modules/team/components/TeamDetails.vue";
import TeamEdit from "@/modules/team/components/TeamEdit.vue";
import BankDetails from "@/modules/bank/components/BankDetails.vue";
import BankEdit from "@/modules/bank/components/BankEdit.vue";
import TaskDetails from "@/modules/task/components/TaskDetails.vue";
import TaskEdit from "@/modules/task/components/TaskEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // core
    {
      path: "/",
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
          path: "/tasks",
          name: "TheTask",
          component: TheTask,
          children: [
            {
              path: "",
              name: "TaskList",
              component: TaskList,
            },
            {
              path: ":uuid",
              name: "TaskDetails",
              component: TaskDetails,
              props: true,
            },
            {
              path: ":uuid/edit",
              name: "TaskEdit",
              component: TaskEdit,
              props: true,
            },
          ],
        },
        // bank
        {
          path: "/banks",
          name: "TheBank",
          component: TheBank,
          children: [
            {
              path: "",
              name: "BankList",
              component: BankList,
            },
            {
              path: ":uuid",
              name: "BankDetails",
              component: BankDetails,
              props: true,
            },
            {
              path: ":uuid/edit",
              name: "BankEdit",
              component: BankEdit,
              props: true,
            },
          ],
        },
        // team
        {
          path: "/teams",
          name: "TheTeam",
          component: TheTeam,
          children: [
            {
              path: "",
              name: "TeamList",
              component: TeamList,
            },
            {
              path: ":thumbnailUrl/:uuid",
              name: "TeamDetails",
              component: TeamDetails,
              props: true,
            },
            {
              path: ":thumbnailUrl/:uuid/edit",
              name: "TeamEdit",
              component: TeamEdit,
              props: true,
            },
            {
              path: "/create",
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

export default router;
