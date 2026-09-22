import {
  Refine,
  GitHubBanner,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { dataProvider } from "./providers/data";
import { ErrorComponent } from "./components/refine-ui/layout/error-component";
import { Layout } from "./components/refine-ui/layout/layout";
import { Header } from "./components/refine-ui/layout/header";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { BookOpen, Home } from "lucide-react";
import SubjectCreate from "./pages/subject/create";
import SubjectList from "./pages/subject/list";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "Q50SDK-LmqTV0-P682Q8",
              }}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    label: "Home",
                    icon: <Home/>,
                    }
                },
                {
                  name: "subjects",
                  list: "/subjects/create",
                  meta: {
                    label: "Subjects",
                    icon: <BookOpen/>,
                    }
                },
              ]}
            >
              <Routes>
                <Route element={ 
                  <Layout> 
                    <Outlet /> 
                  </Layout>}>
                  <Route path="/" element={<Dashboard />} />

                    <Route path="subjects">
                      <Route index element={<SubjectList />} />
                      <Route path="create" element={<SubjectCreate />} />
                    </Route>
                </Route>

                
              </Routes>
              <Toaster />
              <RefineKbar />  
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
