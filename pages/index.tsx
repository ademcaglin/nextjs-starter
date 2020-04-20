import React from "react";
import Layout from "../components/Layout";
import { Button } from "@material-ui/core";

export default function Index() {
  return (
    <Layout>
      Index
      <Button
        onClick={() => {
          alert("gf");
        }}
      >
        Submit
      </Button>
    </Layout>
  );
}
