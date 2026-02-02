/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import { importMap } from '@/app/(payload)/admin/importMap'
import React from 'react'

import './custom.scss'

type Args = {
  children: React.ReactNode
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const Layout = ({ children, params, searchParams }: Args) => (
  <RootLayout
    config={config}
    importMap={importMap}
    params={params}
    searchParams={searchParams}
    serverFunction={async (functionName, args) => {
      'use server'
      return handleServerFunctions({
        ...args,
        config,
        importMap,
        name: functionName,
      })
    }}
  >
    {children}
  </RootLayout>
)

export default Layout
