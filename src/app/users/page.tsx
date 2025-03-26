"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//form Schema
import { createUserSchema } from "./schemas";

//Mui components
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

//Custom components
import ContentBoxWrapper from "@/shared/components/ContentBoxWrapper";
import CustomModal from "@/shared/components/CustomModal";
import Button from "@/shared/components/Button";
import DataGridComponent from "@/shared/components/DataGridComponent";
import SkeletonTable from "@/shared/components/SkeletonTable";
import ToastAlert from "@/shared/components/ToastAlert";

//Hooks
import useModal from "@/shared/hooks/useModal";
import useFetch from "@/shared/hooks/useFetch";

//Icons
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type FormData = z.infer<typeof createUserSchema>;

export default function Users() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
    mode: "onSubmit",
  });

  const { isOpen, toggleModal } = useModal();
  const { data: users } = useFetch<[]>("http://127.0.0.1:8005/users");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    handleCloseMenu();
  };

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data, null, 2));
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "first_name",
      headerName: "NOME",
      width: 150,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "E-MAIL",
      width: 300,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "NOME DE USUÁRIO",
      width: 250,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "date_of_birth",
      headerName: "DT. NASCIMENTO",
      width: 250,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "AÇÕES",
      headerAlign: "center",
      align: "center",
      width: 100,
      sortable: false,
      renderCell: (params: { row: any }) => (
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(event) => handleOpenMenu(event, params.row)}
        >
          <MoreVertIcon />
        </IconButton>
      ),
      type: "actions", // Corrige apenas esta coluna
    },
  ] as any;

  return (
    <ContentBoxWrapper
      title="Gestão de usuários"
      subtitle="Cadastre novos usuários e edite permissões"
    >
      <Box sx={{ width: "100%", mb: 2 }}>
        <Button
          onClick={toggleModal}
          text="ABRIR MODAL"
          icon={<PersonAddIcon />}
        />

        <ToastAlert message="Mensagem de teste" severity="error" />
      </Box>

      <DataGridComponent rows={users || []} columns={columns} pageSize={5} />

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
      >
        <MenuItem onClick={() => handleAction("Editar")}>Editar</MenuItem>
        <MenuItem onClick={() => handleAction("Excluir")}>Excluir</MenuItem>
        <MenuItem onClick={() => handleAction("Visualizar")}>
          Visualizar
        </MenuItem>
      </Menu>

      <SkeletonTable />

      <CustomModal
        open={isOpen}
        onClose={toggleModal}
        title="Título do modal customizado"
        actions={
          <>
            <Button
              onClick={toggleModal}
              text="CANCELAR"
              variant="outlined"
              color="error"
            />
            <Button onClick={toggleModal} text="CADASTRAR" color="success" />
          </>
        }
      >
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  fullWidth
                  label="Nome"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  autoComplete="off"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="last_name"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  autoComplete="off"
                  label="Sobrenome"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  autoComplete="off"
                  {...field}
                  fullWidth
                  label="Nome de Usuário"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Senha"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Confirmar Senha"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" text="CADASTRAR" />
          </Grid>
        </Grid>
      </CustomModal>
    </ContentBoxWrapper>
  );
}
