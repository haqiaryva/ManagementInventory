import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs = [
  {
    title: 'Manage User',
    href: '/manageUser/create',
  },
];

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('manageUser.store'), {
    onFinish: () => reset('password', 'password_confirmation'),
    });

  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah User" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border shadow-lg">
          <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />

          <div className="relative z-10 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Form Tambah User</h2>

            <form onSubmit={submit} className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex items-center gap-4 mb-4">
                <Label htmlFor="name" className="w-40 text-sm font-medium text-gray-700">Unit Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  disabled={processing}
                  placeholder="Enter unit name"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Username */}
              <div className="flex items-center gap-4 mb-4">
                <Label htmlFor="email" className="w-40 text-sm font-medium text-gray-700">Username</Label>
                <Input
                  id="email"
                  type="text"
                  required
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  disabled={processing}
                  placeholder="username123"
                />
                <InputError message={errors.email} />
              </div>

              {/* Password */}
              <div className="flex items-center gap-4 mb-4">
                <Label htmlFor="password" className="w-40 text-sm font-medium text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  disabled={processing}
                  placeholder="Enter password"
                />
                <InputError message={errors.password} />
              </div>

              {/* Confirm Password */}
              <div className="flex items-center gap-4 mb-4">
                <Label htmlFor="password_confirmation" className="w-40 text-sm font-medium text-gray-700">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  required
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  disabled={processing}
                  placeholder="Confirm password"
                />
                <InputError message={errors.password_confirmation} />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
               className="bg-gray-500 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-full transition duration-200 inline-flex items-center"
                disabled={processing}
              >
                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                Create Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
