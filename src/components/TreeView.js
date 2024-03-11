import React, { useContext, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Tree, Modal, Button, Flex, Input } from 'antd';
import { TreeContext } from "../static/TreeProvider";
import { deleteApi, postApi } from "../static/api";

function TreeView() {
    const { treeData } = useContext(TreeContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalOpenAddRoot, setIsModalOpenAddRoot] = useState(false);
    const [key, setKey] = useState('')
    const [id, setID] = useState(0);
    const [title, setTitle] = useState('')

    
    const showModal = (key, info) => {
      setIsModalOpen(true);
      setKey(key)
      setID(info.node.id)
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const showModalAdd = () => {
      setIsModalOpenAdd(true)
      setIsModalOpen(false)
    }

    const showModalAddRoot = () => {
      setIsModalOpenAddRoot(true)
    }
    const handleAdd = async () => {
      //console.log("id:" + id,"title:"+ title)
      try{
        const res = await postApi(id,title)
        alert(res.data)
      }catch(err){
        console.log(err)
      }
      setIsModalOpenAdd(false);
      window.location.reload();
    };

    const handleAddRoot = async () => {
      try{
        const res = await postApi(null,title)
        alert(res.data)
      }catch(err){
        console.log(err)
      }
      setIsModalOpenAdd(false);
      window.location.reload();
    };
    
    const handleDelete = async () => {
      try{
        const res = await deleteApi(id)
        alert(res.data)
      }catch(err){
        alert("Xóa không thành công" + err)
      }
      setIsModalOpen(false);
      window.location.reload();
    }
    const handleCancelAdd = () => {
      setIsModalOpenAdd(false);
    };
    const handleCancelAddRoot = () => {
      setIsModalOpenAddRoot(false);
    };
    return (
      <div>
        <Button onClick={showModalAddRoot} type="dashed">Thêm nút gốc</Button>
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={[]}
          onSelect={showModal}
          treeData={treeData}
        />
        <Modal title="Chọn chức năng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={250}>
          <h4>Key {key} và Node id {id}</h4>
          <Flex gap="small" wrap="wrap">
            <Button onClick={showModalAdd} type="dashed">Thêm</Button>
            <Button onClick={handleDelete} type="dashed">Xóa</Button>
          </Flex>
        </Modal>

        <Modal title="Thêm node" open={isModalOpenAdd} onOk={handleAdd} onCancel={handleCancelAdd} width={250}>
          <h4>Key {key} và Node id {id}</h4>
          <Flex gap="small" wrap="wrap">
            <Input placeholder="Title node" value={title} onChange={e => setTitle(e.target.value)}/>
          </Flex>
        </Modal>


        <Modal title="Thêm node gốc" open={isModalOpenAddRoot} onOk={handleAddRoot} onCancel={handleCancelAddRoot} width={250}>
          <h4>Thêm nút gốc</h4>
          <Flex gap="small" wrap="wrap">
            <Input placeholder="Title node" value={title} onChange={e => setTitle(e.target.value)}/>
          </Flex>
        </Modal>
      </div>
    );
}

export default TreeView;
