import React, { FC } from "react";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import {Skeleton} from "@/app/components";


const loading: FC = async () => {

  return (
    <div className="prose">
      <Heading><Skeleton /></Heading>
        <Skeleton />
        <Card className="mt-5">
            <Skeleton count={10}/>
        </Card>
    </div>
  );
};

export default loading;
