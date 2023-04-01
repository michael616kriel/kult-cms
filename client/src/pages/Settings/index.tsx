import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../layouts/AdminLayout';
import { MenuItemType, SideMenuLayout } from '../../layouts/SideMenuLayout';
import { NotFound } from '../404';
import { Roles } from './roles';
import { Site } from './site';

const settingsMenu = [
  {
    id: 1,
    name: 'Roles',
    link: '/settings/roles',
  },
  {
    id: 2,
    name: 'Site',
    link: '/settings/site-settings',
  },
] as MenuItemType[];

const routes = [
  {
    path: '/',
    element: <Roles />,
    errorElement: <NotFound />,
    index: true,
  },
  {
    path: '/roles',
    element: <Roles />,
    errorElement: <NotFound />,
  },
  {
    path: '/site-settings',
    element: <Site />,
    errorElement: <NotFound />,
  },
];

export const Settings = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (settingsMenu?.length && !selectedItem) {
      setSelectedItem(settingsMenu[0]);
    }
  }, [selectedItem]);

  return (
    <AdminLayout title='Settings' subTitle={`Manage ${selectedItem?.name}`}>
      <SideMenuLayout
        items={settingsMenu}
        onSelect={(item) => {
          setSelectedItem(item);
          navigate(item?.link || '');
        }}
        selectedItem={selectedItem}
      >
        <Routes>
          {routes.map((route) => (
            <Route {...route} />
          ))}
        </Routes>
      </SideMenuLayout>
    </AdminLayout>
  );
};
